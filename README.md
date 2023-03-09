# COMP0022MovieAnalytics

## Common Issues

### Nginx 404 or comp0022.dev cannot be reached dns cannot be resolved

if you ran `skaffold dev` for development but cannot find the website at comp0022.dev on your local browser (which for no reason you should see), go to `/etc/hosts` or `C:\Windows\System32\drivers\etc\hosts` and add the line `127.0.0.1 comp0022.dev` to the end of the file. This redirects comp0022.dev to your local machine.

### Invalid certificate

In chrome, go to settings, search for manage device certificate, and add env/ssl/rootCA.srt to trusted root certificates. We self signed our certificate.

### Make sure you have env folder setup
