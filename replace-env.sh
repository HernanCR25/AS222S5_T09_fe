# replace-env.sh
#!/bin/bash
echo "Reemplazando API_BACKEND en environment.ts"
sed -i "s|${API_BACKEND}|${API_BACKEND}|g" ./src/environments/environment.ts
