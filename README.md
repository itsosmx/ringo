# Ringo 
With the latest Next.js and TypeScript Ringo is a leading-edge web application designed to bridge distances and bring people together. With crystal-clear video and audio, interactive collaboration tools, and seamless integration with your calendar, makes virtual meetings effortless and engaging. Whether it's for business conferences, educational classes, or casual catch-ups, delivers a reliable and immersive meeting experience directly from your browser. 


## Demo: [Ringo.osmx](https://ringo.osmx.me/)



## Setup
- Clone the repository `git clone [link of the repo]`
- Install dependencies Run `npm install` in CMD
- Setup `.env` in the root file of the project.
```
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
NEXT_PUBLIC_STREAM_API_ID=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```
- Add to values of every variable credentials [Clerk](https://clerk.com/) and [Getstream](https://getstream.io/)