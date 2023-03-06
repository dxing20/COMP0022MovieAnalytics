# COMP0022MovieAnalytics

## Common Issues

### Nginx 404 or comp0022.dev cannot be reached

if you ran `skaffold dev` for development but cannot find the website at comp0022.dev on your local browser (which for no reason you should see), go to `/etc/hosts` or `C:\Windows\System32\drivers\etc\hosts` and add the line `127.0.0.1 comp0022.dev` to the end of the file. This redirects comp0022.dev to your local machine.

### Invalid certificate

In chrome, if you see this page when accessing the development client, type `thisisunsafe` and press enter.

## Before running skaffold

add a deployment key from github

run `kubectl create secret generic jwt-secret --from-literal=JWT_KEY='politicaly_correct'`

and `kubectl create secret generic postgres-secret --from-literal=POSTGRES_PASSWORD='KrpA5!f5rxmL]2ts3iTbPh#J[uJ+'`
