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

    # Check root contents to avoid double public_html nesting
    try:
        initial_items = ftp.nlst()
    except Exception:
        initial_items = []
    print(f"📋 Initial directory items: {initial_items}")

    # Determine base directory
    if 'public_html' in initial_items and 'index.html' not in initial_items:
        try:
            ftp.cwd('public_html')
            print(f"📂 Navigated into public_html: {ftp.pwd()}")
        except Exception as e:
            print(f"⚠️ Could not cwd to public_html: {e}")
    else:
        print(f"📂 Staying at root directory: {ftp.pwd()}")

    base_dir = ftp.pwd()

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
    print(f"\n🎉 Successfully deployed {total_uploaded} files to Hostinger!")

if __name__ == '__main__':
    main()
