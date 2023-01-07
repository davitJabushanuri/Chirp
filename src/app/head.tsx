interface IHead {
  title?: string;
  description?: string;
}

export default function Head({ title = "", description = "" }: IHead = {}) {
  return (
    <>
      <title>{title ? `${title} | Twitter` : undefined}</title>
      <meta name="description" content={description} />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/twitter-logo.svg" />
    </>
  );
}
