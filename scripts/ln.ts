import { basename, join } from "node:path";
import { exec } from "node:child_process";

const pwd = Bun.env.PWD;
if (!pwd) {
  process.exit(0);
}

const pkg = basename(pwd);
const target = join(
  pwd,
  `../../dist/ObsidianPluginDevTest/.obsidian/plugins/${pkg}`,
);

console.log({
  pwd,
  pkg,
  target,
});

exec(`ln -s ${target} dist`, { cwd: pwd });
