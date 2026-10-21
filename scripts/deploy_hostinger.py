import os
import sys
import ftplib

def remove_ftp_tree(ftp, path):
    """Recursively delete a remote directory tree in FTP."""
    orig_pwd = ftp.pwd()
    # Check if target is a directory by attempting cwd
    try:
        ftp.cwd(path)
        is_dir = True
    except ftplib.all_errors:
        is_dir = False

    if not is_dir:
        # It's a file, delete directly
        try:
            ftp.delete(path)
        except ftplib.all_errors:
            pass
        return

    # It's a directory: list items and recursively delete them
    try:
        items = ftp.nlst()
    except ftplib.all_errors:
        items = []

    for item in items:
        # Strip path prefix if server returns full or relative path
        name = item.rstrip('/').split('/')[-1]
        if name in ('.', '..', ''):
            continue
        remove_ftp_tree(ftp, name)

    # Return to parent directory and remove the empty directory
    ftp.cwd(orig_pwd)
    try:
        ftp.rmd(path)
        print(f"  🗑️ Removed nested directory: {path}")
    except ftplib.all_errors as e:
        print(f"  ⚠️ Could not remove {path}: {e}")

def main():
    server = os.environ.get('FTP_SERVER', '').strip()
    username = os.environ.get('FTP_USERNAME', '').strip()
    password = os.environ.get('FTP_PASSWORD', '').strip()
    target_dir_env = os.environ.get('FTP_TARGET_DIR', '').strip()
    clean_nested_env = os.environ.get('CLEAN_NESTED_PUBLIC_HTML', 'true').strip().lower() in ('true', '1', 'yes')

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

    # Determine base directory
    if target_dir_env and target_dir_env not in ('.', '/'):
        try:
            ftp.cwd(target_dir_env)
            base_dir = ftp.pwd()
            print(f"📂 Navigated to configured FTP_TARGET_DIR: {base_dir}")
        except Exception as e:
            print(f"⚠️ Failed to navigate to FTP_TARGET_DIR ({target_dir_env}): {e}")
            base_dir = current_pwd
    elif 'domains' in initial_items and 'public_html' in initial_items:
        # Hostinger Master FTP account (rooted at /home/uXXXXX containing domains/)
        try:
            ftp.cwd('public_html')
            base_dir = ftp.pwd()
            print(f"📂 Hostinger master account detected. Navigated into public_html: {base_dir}")
        except Exception as e:
            base_dir = current_pwd
            print(f"⚠️ Could not cwd to public_html: {e}")
    else:
        # Dedicated website FTP account: Hostinger chroots the session directly to public_html!
        # Thus, current_pwd ('/') IS already the website root. DO NOT enter or create public_html.
        base_dir = current_pwd
        print(f"📂 Website root detected (already inside public_html): {base_dir}")

        # If a previous deployment created an accidental nested 'public_html', clean it up!
        if clean_nested_env and 'public_html' in initial_items:
            print("🧹 Detected accidental nested 'public_html' directory. Cleaning it up...")
            remove_ftp_tree(ftp, 'public_html')
            ftp.cwd(base_dir)
            print("✨ Accidental nested directory successfully cleaned up!")

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
