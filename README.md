# Tutorial: Protecting a Multi-tenant Next.js client/server app with PropelAuth

This is the reference app for the ["Protecting a Multi-tenant Next.js client/server app with PropelAuth"](https://www.propelauth.com/blog/todo) tutorial. Follow along to create a complete Next.js app that creates digital coupons on demand using OpenAI's API and PropelAuth to ensure only authorized users can create coupons.

## What You'll Build

 You'll create a multi-tenant (or B2B) Next.js app that creates digital coupons on demand using OpenAI's API. OpenAI will create a coupon image using a discount percentage entered by the user along with their assigned grocery store name. We'll use PropelAuth, a B2B/multi-tenant authentication provider, to ensure only authorized users can create coupons. Out-of-the-box, it provides account sign up, login, logout functionality and we’ll use their roles and permissions system to verify the user is in the correct role before allowing them to create a coupon.

## Components

- Web framework and API: [Next.js](https://nextjs.org/)
- Creating digital coupons: [OpenAI API](https://openai.com/index/openai-api/)
- Securing the frontend and backend: [PropelAuth](https://propelauth.com)

## How to Run

1. Clone this repository.
1. In a terminal, change directory into the repo: `cd propelauth-coupon-generator`.
1. Install all packages: `npm install`.
1. Follow [the quickstart guide](https://docs.propelauth.com/getting-started/quickstart-fe) to sign up for PropelAuth for free, configure a project, then configure the `.env` file with your environment variables.
1. Build then run on localhost: `npm run build && npm run start`.
