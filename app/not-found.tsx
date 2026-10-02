import Link from "next/link";
import { Container } from "@/components/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="font-mono text-sm text-signal">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        This route doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you asked for is not on this host. Everything that is here
        starts from the home directory.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-hairline px-4 py-2 text-sm transition-colors hover:bg-surface-raised"
        >
          Go home
        </Link>
      </p>
    </Container>
  );
}
