# Portfolio CLI contributor guide

- Keep `bin/cli.js` limited to argument parsing, messages, and top-level errors.
- Put validation and filesystem operations in `src/`.
- Keep `templates/portfolio/` independently runnable and free of personal data.
- Never overwrite an existing destination or copy build artifacts, dependencies, Git data, or private environment files.
- Prefer built-in Node.js APIs and focused functions over premature abstractions.
- Update tests and documentation when public CLI behavior changes.
