# COMP0022MovieAnalytics

## Installation

1. Clone both the common repository and this into a working directory. 
2. Install skaffold
3. Unzip the env folder to the same directory of this readme file.
4. Run all the kubernetes secrets in the env folder.
5. Go to `/etc/hosts` or `C:\Windows\System32\drivers\etc\hosts` and add the line `127.0.0.1 comp0022.dev` to the end of the file. This redirects comp0022.dev to your local machine.
6. In your browser, add the rootCA.srt as trusted root certificates from the env folder
7. Run `skaffold dev`, this might take a long time. If nginx fails during initial deployment, simply rerun the `skaffold dev`. This is caused by the deployment order of the initial build. 
