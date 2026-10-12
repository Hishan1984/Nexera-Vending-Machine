import os
import zipfile

dist_dir = os.path.abspath('dist')
zip_path = os.path.abspath('nexera-deploy-public_html.zip')

print(f"Creating ZIP archive from: {dist_dir}")

added_files = []
with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as zf:
    for root, _, files in os.walk(dist_dir):
        # Sort files for deterministic archive order
        for filename in sorted(files):
            file_abs_path = os.path.join(root, filename)
            rel_path = os.path.relpath(file_abs_path, dist_dir)
            # Ensure standard forward-slash ZIP paths for cPanel / POSIX compatibility
            zip_entry_name = rel_path.replace('\\', '/')
            zf.write(file_abs_path, arcname=zip_entry_name)
            added_files.append(zip_entry_name)

print(f"Successfully packaged {len(added_files)} files into {zip_path}.")
print("\nFirst 15 entries:")
for name in added_files[:15]:
    print(f"  - {name}")

# Check specific critical files
assert "index.html" in added_files, "index.html must be at archive root"
assert ".htaccess" in added_files, ".htaccess must be at archive root"
assert "api/contact.php" in added_files, "api/contact.php must have forward slashes"
assert "api/phpmailer/PHPMailer.php" in added_files, "PHPMailer must have forward slashes"
print("\nAll integrity assertions passed!")
