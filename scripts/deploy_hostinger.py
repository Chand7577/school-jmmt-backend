import os
import sys
import ftplib

def main():
    server = os.environ.get('FTP_SERVER', '').strip()
    username = os.environ.get('FTP_USERNAME', '').strip()
    password = os.environ.get('FTP_PASSWORD', '').strip()

    # Clean server address
    server = server.replace('ftp://', '').replace('https://', '').replace('http://', '').strip('/')
    if ':' in server:
        host, port_str = server.split(':', 1)
        port = int(port_str)
    else:
        host = server
        port = 21

    if not host or not username or not password:
        print("❌ Error: Missing FTP_SERVER, FTP_USERNAME, or FTP_PASSWORD secrets.")
        sys.exit(1)

    print(f"📡 Connecting to {host}:{port} as {username}...")
    ftp = ftplib.FTP()
    ftp.connect(host, port, timeout=60)
    ftp.login(username, password)
    ftp.set_pasv(True)
    print("✅ Authenticated successfully!")

    current_pwd = ftp.pwd()
    print(f"📂 Initial FTP directory: {current_pwd}")

    try:
        initial_items = ftp.nlst()
    except Exception:
        initial_items = []
    print(f"📋 Initial directory items: {initial_items}")

    # Determine correct base directory
    # If the FTP user was placed directly in /public_html, STAY THERE!
    if current_pwd == '/public_html' or current_pwd.endswith('/public_html'):
        base_dir = current_pwd
        print(f"📂 Already at website root: {base_dir} (will NOT nest into public_html)")
    elif 'public_html' in initial_items:
        try:
            ftp.cwd('public_html')
            base_dir = ftp.pwd()
            print(f"📂 Navigated into public_html: {base_dir}")
        except Exception as e:
            base_dir = current_pwd
            print(f"⚠️ Could not cwd to public_html: {e}")
    else:
        base_dir = current_pwd
        print(f"📂 Staying at root directory: {base_dir}")

    local_dir = 'deploy_out'
    if not os.path.isdir(local_dir):
        print(f"❌ Error: {local_dir} directory not found.")
        sys.exit(1)

    total_uploaded = 0

    for root, dirs, files in os.walk(local_dir):
        rel_dir = os.path.relpath(root, local_dir)

        # Navigate from base_dir to target remote directory
        ftp.cwd(base_dir)
        if rel_dir != '.':
            for part in rel_dir.replace('\\', '/').split('/'):
                if not part:
                    continue
                try:
                    ftp.mkd(part)
                except Exception:
                    pass  # Directory already exists
                ftp.cwd(part)
                try:
                    ftp.sendcmd(f"SITE CHMOD 755 {part}")
                except Exception:
                    pass

        for f in files:
            local_file_path = os.path.join(root, f)
            file_size = os.path.getsize(local_file_path)
            display_path = os.path.normpath(os.path.join(rel_dir, f))
            print(f"⬆️  Uploading: {display_path} ({file_size} bytes)...")
            with open(local_file_path, 'rb') as fp:
                ftp.storbinary(f"STOR {f}", fp)
            try:
                ftp.sendcmd(f"SITE CHMOD 644 {f}")
            except Exception:
                pass
            total_uploaded += 1

    ftp.cwd(base_dir)
    try:
        deployed_items = ftp.nlst()
        print(f"\n📋 Verified deployed root ({base_dir}) contents: {deployed_items}")
    except Exception:
        pass

    ftp.quit()
    print(f"\n🎉 Successfully deployed {total_uploaded} files to Hostinger ({base_dir})!")

if __name__ == '__main__':
    main()
