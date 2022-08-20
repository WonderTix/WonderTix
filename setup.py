print("This application relies on Stripe API keys.")
print("To get these keys, create an account on https://stripe.com")
print("Then got to https://dashboard.stripe.com/apikeys to retrieve your keys.\n")

stripe_api = input("Please enter your Stripe Secret Key: ")
while stripe_api == "":
    stripe_api = input("Key cannot be empty. Please enter your Stripe Secret Key: ")

PG_DB = input("Please enter the desired postgres database name: ")
while PG_DB == "":
    PG_DB = input("Postgres database cannot be blank. Please enter the desired postgres database name: ")

PG_USER = input("Please enter desired postgres username [postgres]: ")
if PG_USER == "":
    PG_USER = "postgres"

PG_PASS = input("Please enter desired postgres password [postgres]: ")
if PG_PASS == "":
    PG_PASS = "postgres"

AUTH0_URL = input("Please enter the Auth0 URL [https://wtix-dev.us.auth0]: ")
if AUTH0_URL == "":
    AUTH0_URL = "https://wtix-dev.us.auth0.com"

AUTH0_CLIENT_ID = input("Please enter the Auth0 Client ID: ")
while AUTH0_CLIENT_ID == "":
    AUTH0_CLIENT_ID = input("Auth0 Client ID cannot be empty. Please enter the Auth0 Client ID: ")

AUTH0_CLIENT_SECRET = input("Please enter the Auth0 Client Secret: ")
while AUTH0_CLIENT_SECRET == "":
    AUTH0_CLIENT_SECRET = input("Auth0 Client Secret cannot be empty. Please enter the Auth0 Client Secret: ")

AUTH0_AUDIENCE = input("Please enter the Auth0 Audience [https://localhost:8000]: ")
if AUTH0_AUDIENCE == "":
    AUTH0_AUDIENCE = "https://localhost:8000"

with open(".env", "w") as f:
    f.write("PG_USER=" + PG_USER + "\n")
    f.write("PG_PASS=" + PG_PASS + "\n")
    f.write("PG_DB=" + PG_DB + "\n")
    f.write("PRIVATE_STRIPE_KEY=" + stripe_api + "\n")
    f.write("ROOT_URL=http://localhost:8000\n")
    f.write("FRONTEND_URL=https://localhost:3000\n")
    f.write("AUTH0_URL=" + AUTH0_URL + "\n")
    f.write("AUTH0_CLIENT_ID=" + AUTH0_CLIENT_ID + "\n")
    f.write("AUTH0_CLIENT_SECRET=" + AUTH0_CLIENT_SECRET + "\n")
    f.write("AUTH0_AUDIENCE=" + AUTH0_AUDIENCE + "\n")
