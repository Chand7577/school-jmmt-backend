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

    # Navigate into public_html if it exists
    try:
        ftp.cwd('public_html')
        base_dir = ftp.pwd()
        print(f"📂 Target remote directory: {base_dir}")
    except Exception as e:
        base_dir = ftp.pwd()
        print(f"📂 Current directory: {base_dir} (could not cwd to public_html: {e})")

    local_dir = 'deploy_out'
    if not os.path.isdir(local_dir):
        print(f"❌ Error: {local_dir} directory not found.")
        sys.exit(1)

    total_uploaded = 0

    for root, dirs, files in os.walk(local_dir):
        rel_dir = os.path.relpath(root, local_dir)

        # Navigate from base_dir to the target remote directory
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

        for f in files:
            local_file_path = os.path.join(root, f)
            file_size = os.path.getsize(local_file_path)
            display_path = os.path.normpath(os.path.join(rel_dir, f))
            print(f"⬆️  Uploading: {display_path} ({file_size} bytes)...")
            with open(local_file_path, 'rb') as fp:
                ftp.storbinary(f"STOR {f}", fp)
            total_uploaded += 1

    ftp.quit()
    print(f"\n🎉 Successfully uploaded {total_uploaded} files to Hostinger!")

if __name__ == '__main__':
    main()
