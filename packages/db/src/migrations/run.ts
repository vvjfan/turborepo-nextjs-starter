import { promises as fs } from "node:fs";
import path from "node:path";
import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "../client";

const migrationFolder = path.join(__dirname);

async function runMigrations() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs: {
        readdir: (dir) => fs.readdir(dir),
        readFile: async (file) => {
          const content = await fs.readFile(file, "utf-8");
          return content;
        },
        writeFile: () => Promise.resolve(),
        mkdir: () => Promise.resolve(),
        symlink: () => Promise.resolve(),
        unlink: () => Promise.resolve(),
        chmod: () => Promise.resolve(),
        copyFile: () => Promise.resolve(),
        stat: () => Promise.resolve({} as import("fs").Stats),
        lstat: () => Promise.resolve({} as import("fs").Stats),
        rename: () => Promise.resolve(),
        rmdir: () => Promise.resolve(),
        rm: () => Promise.resolve(),
        lutimes: () => Promise.resolve(),
        realpath: () => Promise.resolve(""),
        readlink: () => Promise.resolve(""),
        mkdtemp: () => Promise.resolve(""),
        opendir: () => Promise.reject(new Error("Not implemented")),
        access: () => Promise.resolve(),
        appendFile: () => Promise.resolve(),
        chown: () => Promise.resolve(),
        close: () => Promise.resolve(),
        createReadStream: () => Promise.reject(new Error("Not implemented")),
        createWriteStream: () => Promise.reject(new Error("Not implemented")),
        exists: () => Promise.resolve(true),
        fchmod: () => Promise.resolve(),
        fchown: () => Promise.resolve(),
        fdatasync: () => Promise.resolve(),
        fstat: () => Promise.resolve({} as import("fs").Stats),
        fsync: () => Promise.resolve(),
        ftruncate: () => Promise.resolve(),
        futimes: () => Promise.resolve(),
        link: () => Promise.resolve(),
        open: () => Promise.resolve(0),
        read: () => Promise.resolve({ bytesRead: 0, buffer: Buffer.alloc(0) }),
        readFile: async (file: string | URL) => {
          const content = await fs.readFile(file, "utf-8");
          return content;
        },
        readlink: () => Promise.resolve(""),
        realpath: () => Promise.resolve(""),
        rename: () => Promise.resolve(),
        rmdir: () => Promise.resolve(),
        rm: () => Promise.resolve(),
        stat: () => Promise.resolve({} as import("fs").Stats),
        symlink: () => Promise.resolve(),
        truncate: () => Promise.resolve(),
        unlink: () => Promise.resolve(),
        utimes: () => Promise.resolve(),
        write: () => Promise.resolve({ bytesWritten: 0, buffer: Buffer.alloc(0) }),
        writeFile: () => Promise.resolve(),
      },
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  for (const result of results ?? []) {
    if (result.status === "Success") {
      console.log(`Migration "${result.migrationName}" executed successfully`);
    } else if (result.status === "NotExecuted") {
      console.log(`Migration "${result.migrationName}" skipped (already executed)`);
    }
  }

  if (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }

  await db.destroy();
}

runMigrations();
