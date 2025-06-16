export function Footer() {
  return (
    <footer className="py-4 md:py-6 border-t border-border/40 relative z-10">
      <div className="container flex flex-col items-center justify-between gap-2 md:h-20 md:flex-row px-4 sm:px-6 lg:px-8">
        <p className="text-balance text-center text-xs leading-loose text-muted-foreground md:text-left md:text-sm">
          &copy; {new Date().getFullYear()} Umer Farooq. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground md:text-sm">
          Based in Faisalabad, Pakistan.
        </p>
      </div>
    </footer>
  );
}
