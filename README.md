# Holidaze

An accomoation site built with Next.js and the Noroff API - Project Exam 2 at Noroff.

**Live site:** https://project-exam-2-plum.vercel.app/

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- React 19 and TypeScript
- Tailwind CSS v4
- [Noroff API v2](https://docs.noroff.dev/docs/v2) (Holidaze and Auth)
- [react-day-picker](https://daypicker.dev/) for the booking calendar
- [react-icons](https://react-icons.github.io/react-icons/) and [lucide-react](https://lucide.dev/) for icons
- ESLint for linting
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

### Requirements

- Node.js 20.9 or later
- A Noroff account with a `@stud.noroff.no` email address (needed to register, log in and get an API key)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/emifos/project-exam-2.git
```

2. Navigate to the project directory:

```bash
cd project-exam-2
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables (see [Environment variables](#environment-variables)).

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command         | What it does                  |
| --------------- | ----------------------------- |
| `npm run dev`   | Starts the development server |
| `npm run build` | Creates a production build    |
| `npm run start` | Runs the production build     |
| `npm run lint`  | Runs ESLint                   |

## Environment variables

| Variable              | Required | Used for                                                                                |
| --------------------- | -------- | --------------------------------------------------------------------------------------- |
| `API_KEY`             | Yes      | Base URL for the Noroff API: `https://v2.api.noroff.dev/`                               |
| `NEXT_PUBLIC_API_KEY` | Yes      | Noroff API key. Needed for profiles, bookings and creating, editing and deleting venues |

Browsing and searching venues works without an API key.
`NEXT_PUBLIC_API_KEY` is sent to the browser, because booking, venues and profiles are fetched from the client components. The key alone gives no access, since every protected request also need the users's access token.

### Get an API key

1. Register a user with `POST https://v2.api.noroff.dev/auth/register` (use your `@stud.noroff.no` email). You can also register on the live site.
2. Log in with `POST /auth/login` and copy the `accessToken`.
3. Call `POST /auth/create-api-key` with the header `Authorization: Bearer <accessToken>`.
4. Copy the `key` from the response.

You can also create a key with the API Key Tool in the [Noroff API key documentation](https://docs.noroff.dev/docs/v2/authentication).

### Set up locally

1. Copy the example file:

```bash
cp .env.example .env.local
```

2. Paste your key into `NEXT_PUBLIC_API_KEY` in `.env.local`.

3. Restart the dev server (`npm run dev`). Environment variables are only read when the server starts.

`env.local` is ignored by Git. Never commit API keys.

## Deployment

The site is deployed on [Vercel](https://vercel.com/). `NEXT_PUBLIC_BASE_URL` and `NEXT_PUBLIC_API_KEY` are set as environment variables in the Vercel project settings. Variables starting with `NEXT_PUBLIC` are added at built time, so the project must be redeployed after they change.

## Recourses

- Figma design
- Style guide
- [Noroff API v2 documentation](https://docs.noroff.dev/)
- [Next.js documentation](https://nextjs.org/docs)
- [React documentation](https://react.dev/)
- [Tailwind documentation](https://tailwindcss.com/)
- [react-day-picker documentation](https://daypicker.dev/)
- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- Earlier Next.js projects I have worked on - used for inspiration.

## Contact

Emilie Sofie Fosmo

emilie.fosmo@hotmail.com

## AI usage

- **Tool used:** Claude (Anthropic)
- **Date:** 07.11.26
- **Purpose:** I decided what each ticket on my project board should include, and asked the AI to put it into a clear structure on some of the tickets. This saved me time on formatting, so I could focus on the planning itself. I review and edit the drafts to fit my own design and plan.
- **Outcome:** A draft for some tickets with a short description and acceptance criteria as checkboxes. I changed the drafts to fit my project.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 09.11.26
- **Purpose:** Get help understanding why Next.js would not start (Windows blocked Turbopack) and why Tailwind styling stopped working when I switched to Webpack.
- **Outcome:** An explanation of the error and the fix: running the dev server with --webpack and adding the Tailwind PostCSS plugin with a postcss.config.mjs file.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 10.11.26
- **Purpose:** Debug failed register request (404/400) to the Noroff API.
- **Outcome:** 404 was caused by a trailing slash in NEXT_PUBLIC_BASE_URL. 400 was an already existing user. Registration now works for both account types.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 11.11.26
- **Purpose:** Understand the ESLint error "Calling setState synchronously within an effect" when reading the logged-in user from localStorage in AuthContext.
- **Outcome:** The rule warns against setState in useEffect because it causes an extra render. Here the effect is needed, since localStorage only exists in the browser and reading it during render causes a hydration mismatch. Disabled the rule after confirming with the teacher and added comment.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 11.11.26
- **Purpose:** Get an explanation of what to write to disable the ESLint rule for setState in useEffect in AuthContext.
- **Outcome:** Added an eslint-disable-next-line comment with an explanation of why the user is read from localStorage after mount.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 12.11.26
- **Purpose:** Get help with venue images from the API that failed to load in next/image.
- **Outcome:** Allowed remote images in next.config.ts. Created a VenueImage client component that shows a fallback when an image is missing or broken, since some venues in the API have invalid image URLs.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 12.11.26
- **Purpose:** Debug failed Vercel deployment (Invalid URL: undefined/holidaze/venues).
- **Outcome:** NEXT_PUBLIC_BASE_URL was missing in Vercel, since .env.local is not pushed to GitHub. Added it as one environment variable in Vercel and redeployed. Also fixed a typo in the sortOrder query parameter.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 16.11.26
- **Purpose:** Understand why my custom colors and width did not apply to the react-day-picker calendar.
- **Outcome:** The CSS variables in globals.css were overridden because the DayPicker style.css is imported in the component and loads after globals.css.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 24.11.26
- **Purpose:** Understand 404 errors in the console on Vercel for the footer links.
- **Outcome:** The errors came from Next.js prefetching pages that don’t exist. Added prefetch={false} to the footer links, so pages are only loaded on click.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 24.11.26
- **Purpose:** Understand how role and searchParams are used to pass data between pages.
- **Outcome:** Learned that searchParams holds the values after ? in the URL (e.g. /login?role=manager). In Next.js 16 it is a Promise, so the page must be async and use await. role is a custom name I chose. The page reads it and passes it to LoginForm as a prop.

---

- **Tool used:** Claude (Anthropic)
- **Date:** 26.11.26
- **Purpose:** Understand why customers could still open /venues/create and /venues/[id]/edit.
- **Outcome:** The pages had no access check, so anyone could open them by typing the URL. The API blocked saving, but the form was still visible. Created a custom hook, useRequireManager, that redirects users who are not venue managers (or not the venue owner) away from these pages.

---
