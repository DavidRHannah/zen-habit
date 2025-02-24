# Introduction

This document provides a step-by-step guide for testing, debugging, and
deploying the My Study Tool application. It covers local development
setup, using Stripe webhooks with the Stripe CLI, and deploying to a
production environment (e.g., Vercel).

# Local Development Setup

## Clone the Repository

Open your terminal and run:

``` {.bash language="bash"}
git clone https://github.com/DavidRHannah/zen-habit.git
cd zen-habit
```

## Install Dependencies

Run the following command:

``` {.bash language="bash"}
npm install
```

Alternatively, if you use Yarn:

``` {.bash language="bash"}
yarn install
```

## Configure Environment Variables

Create a file named `.env.local` in the root of your project and add the
following content:

``` {.bash language="bash"}
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PRICE_ID=your_stripe_price_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Adjust the values as needed.

## Database Setup

Ensure your Supabase project contains the required tables:

-   **Profiles:** Stores extra user details such as `stripe_customer_id`
    and `subscription_status`.

-   **Habits:** Tracks user habits, completion status, and points.

-   **Study Sessions:** Logs study sessions and earned points.

# Local Testing

## Running the Development Server

Start your Next.js app in development mode:

``` {.bash language="bash"}
npm run dev
```

Then, visit <http://localhost:3000> in your browser to test pages such
as Home, Dashboard, and Subscription.

## Testing Supabase Integration

-   **User Data & Tables:** Use the Supabase dashboard to verify that
    your tables (`profiles`, `habits`, `study_sessions`) are correctly
    receiving data when you create or update records from your
    application.

-   **Real-Time Updates:** If you use Supabase's real-time features,
    check that changes are immediately reflected in your application UI.

## Testing Stripe Webhooks

### Using the Stripe CLI

#### Install the Stripe CLI:

Follow the installation guide available at
<https://stripe.com/docs/stripe-cli#install>. For example, on macOS:

``` {.bash language="bash"}
brew install stripe/stripe-cli/stripe
```

#### Login and Authenticate:

Run:

``` {.bash language="bash"}
stripe login
```

#### Forward Webhook Events:

Run the following command to forward Stripe events to your local webhook
endpoint:

``` {.bash language="bash"}
stripe listen --forward-to http://localhost:3000/api/stripe-webhook
```

The CLI will output a webhook secret; verify that this secret matches
your `STRIPE_WEBHOOK_SECRET` in your `.env.local`.

#### Trigger Test Events:

To simulate a checkout session completion, run:

``` {.bash language="bash"}
stripe trigger checkout.session.completed
```

Check your terminal and logs to ensure that the event is received and
processed by your webhook endpoint (e.g., updating the Supabase
`profiles` table).

# Automated Testing

## Unit and Integration Tests

Consider setting up tests using frameworks such as
[Jest](https://jestjs.io/) and [React Testing
Library](https://testing-library.com/docs/react-testing-library/intro).
Example commands:

``` {.bash language="bash"}
npm run test
```

or

``` {.bash language="bash"}
yarn test
```

## Linting

Ensure your code adheres to style guidelines:

``` {.bash language="bash"}
npm run lint
```

or

``` {.bash language="bash"}
yarn lint
```

*Note: You may need to add specific test configurations and scripts
based on your chosen testing framework.*

# Deployment Guide

## Pre-deployment Checklist

Before deploying your application, ensure:

-   All environment variables are set correctly for production (use live
    API keys for Stripe and the production URL for Supabase).

-   Your Supabase tables are correctly configured.

-   The application has been thoroughly tested locally.

-   You have set up your webhook endpoint in Stripe to point to your
    production URL (e.g., <https://yourdomain.com/api/stripe-webhook>).

## Deploying with Vercel

### Push Your Code to GitHub (or your Git provider)

Ensure your latest changes are committed and pushed.

### Sign Up / Log In to Vercel

Go to <https://vercel.com> and link your GitHub repository.

### Configure Environment Variables on Vercel

In your project dashboard on Vercel, navigate to **Settings \>
Environment Variables** and add:

``` {.bash language="bash"}
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
STRIPE_SECRET_KEY
STRIPE_PRICE_ID
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_BASE_URL   % Set to your production URL
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

### Deploy Your Application

Vercel automatically deploys when you push to the main branch. You can
also trigger manual deployments from the Vercel dashboard.

### Verify Deployment

-   Visit your production URL.

-   Test key features (e.g., creating checkout sessions, webhook events,
    and Supabase integration).

# Troubleshooting and Next Steps

## Logs and Monitoring

-   Use Vercel's dashboard for real-time logs.

-   Monitor the Stripe Dashboard and Supabase logs for any errors.

## Local Debugging

-   Continue using the Stripe CLI to simulate webhook events.

-   Utilize browser developer tools and your IDE's debugging features
    for frontend issues.

## Documentation Updates

-   Update this document as you add features or change configurations.

-   Maintain version control for this documentation alongside your code.

## Continuous Integration

Consider setting up CI/CD (e.g., using GitHub Actions) to run tests
automatically on each push.

# Further References

For additional details, please refer to:

-   [Stripe Documentation](https://stripe.com/docs)

-   [Supabase Documentation](https://supabase.com/docs)

-   [Next.js Documentation](https://nextjs.org/docs)

-   [Vercel Documentation](https://vercel.com/docs)
