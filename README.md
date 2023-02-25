<a href="https://twitter-v2-sand.vercel.app/" target="_blank" rel="noopener">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="" />
    <img alt="Chirp" src="" />
  </picture>
</a>

<div align="center">
  <h1>Chirp</h1>
  <h3>A full-stack Twitter clone<br />built with Next.js, React Query,<br /> Prisma, PostgreSQL, and Supabase.</h3>
  
  <br />
  <figure>
    <img src="" alt="Demo" />
    <figcaption>
      <p align="center">
        Chirp in action
      </p>
    </figcaption>
  </figure>
</div>

<br />

## Features

Chirp users can:

- 📱 View the optimal layout for the interface depending on their device's screen size
- 🎨 Tailor the interface to their preferences with custom themes and colors
- 🔑 Sign in with Google
- 🎨 Customize profile (upload profile and banner images, change name, add description, location, and website)
- 👀 See what other users are tweeting about and inspect their activity such as likes, retweets, and comments.
- 📷 Share their moments - create and upload tweets with up to 4 images.
- 💬 Engage in conversation by replying to tweets
- ❤️ Give their approval with a like, or take it back
- 🔄 Retweet and quote tweets - Share a tweet with their followers by retweeting or quote it with their own thoughts and comments.
- 🔖 Save tweets for later and organize them with bookmarks
- 🔥 View trending hashtags and create their own by including them in their tweets
- 👥 Discover and follow other users, as well as inspect their profiles and tweets.
- 📩 Send and receive direct messages

## Development workflow

Chirp uses [yarn](https://yarnpkg.com/) as a package manager, so make sure to [install](https://yarnpkg.com/getting-started/install) it first.

```bash
git clone git@github.com:davitJabushanuri/Chirp.git
cd Chirp
yarn install
yarn dev
```

### Environment Variables

Before running the development server, make sure to create `.env` and `.env.local` files in the root directory of the project and add the required environment variables. You can use the examples provided in the repository as a starting point: [.env.example](https://github.com/davitJabushanuri/Chirp/blob/main/.env.axample) and [.env.local.example](https://github.com/davitJabushanuri/Chirp/blob/main/.env.local.example).

```bash
cp .env.example .env
cp .env.local.example .env.local
```

### Prisma

Chirp uses [Prisma](https://www.prisma.io/) as an ORM to interact with the database. Before running the development server, make sure to generate the Prisma client by running:

```bash
yarn prisma generate
```

After generating the Prisma client, make sure to also push any changes to the database schema by running:

```bash
yarn prisma db push
```

This ensures that the local database is up-to-date with any changes made to the schema in the codebase.

## Contributing

- Missing something or found a bug? [Report here](https://github.com/davitJabushanuri/Chirp/issues).
- Want to contribute? Check out our [contribution guide](https://github.com/davitJabushanuri/Chirp/blob/main/CONTRIBUTING.md).

## License

Chirp is licensed under the [MIT License](https://github.com/davitJabushanuri/Chirp/blob/main/LICENSE.md).
