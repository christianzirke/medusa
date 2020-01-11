import s from 'shelljs';
import config from './tsconfig.json';

const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdirSync(outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdirSync('-p', `${outDir}/common/swagger`);
s.cp('server/common/api.yml', `${outDir}/common/api.yml`);
