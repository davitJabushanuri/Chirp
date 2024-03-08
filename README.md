# Chirp

[Preview the project](http://twitter.fly.dev)

This project is an experiment to learn and grow, to dive-deep into full-stack development and see what I can build. My goal is to create a social media platform inspired by Twitter, but with my own unique touch. It's a learning playground where I'll be experimenting with different features, mimicking and improving functionalities found on Twitter, while also learning and applying new tools and technologies along the way.

## Features

- Fully responsive and pixel-perfect design.
- Customize your experience with personalized themes, colors, and font sizes.
- Customize your profile by uploading profile and banner images, and adding personal details.
- Compose tweets with up to 4 images and express yourself with emoji support.
- Engage with tweets - like, comment, retweet, quote, and share.
- Save tweets with bookmark feature for quick access later.
- Discover trending hashtags and make your own by using them in your tweets.
- Discover and follow other users, as well as inspect their profiles and tweets.
- Send and receive direct messages in real-time.

### Built with

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Zustand](https://zustand.surge.sh/)
- [Socket.io](https://socket.io/)
- [zod](https://github.com/colinhacks/zod)
- [Upstash Redis](https://upstash.com/)
- [Framer motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SCSS](https://sass-lang.com/)

## Getting started

Chirp uses [pnpm](https://pnpm.io) as a package manager, so make sure to [install](https://pnpm.io/installation) it first.

### Installation

```bash
git clone git@github.com:davitJabushanuri/Chirp.git
cd Chirp
pnpm i
pnpm dev
```

### Environment Variables

Before running the development server, make sure to create `.env` file in the root directory of the project and add the required environment variables. You can use the example provided in the repository as a starting point.

```bash
cp .env.example .env
```

### Prisma

Chirp uses [Prisma](https://www.prisma.io/) as an ORM to interact with the database. Before running the development server, make sure to generate the Prisma client by running:

```bash
npx prisma generate
```

After generating the Prisma client, make sure to also push any changes to the database schema by running:

```bash
npx prisma db push
```

This ensures that the local database is up-to-date with any changes made to the schema in the codebase.

## Contributing

- Missing something or found a bug? [Report here](https://github.com/davitJabushanuri/Chirp/issues).
- Want to contribute? Check out the [contribution guide](https://github.com/davitJabushanuri/Chirp/blob/main/CONTRIBUTING.md).

## License

Distributed under the [MIT License](https://github.com/davitJabushanuri/Chirp/blob/main/LICENSE).

## Acknowledgments

- [Docker](https://www.docker.com/)
- [Fly.io](https://fly.io/)
- [Supabase](https://supabase.com/)
