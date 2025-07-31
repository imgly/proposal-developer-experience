import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Detects the popular JavaScript framework used in a project directory.
 * @param {string} projectDir - Absolute path to the project directory.
 * @returns {string|null} - Detected framework name in lowercase, or null if unknown.
 */
export function detectJsFramework(projectDir) {
  const pkgPath = path.join(projectDir, 'package.json');
  const fileExists = file => fs.existsSync(path.join(projectDir, file));

  let dependencies = {};

  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      dependencies = {
        ...pkg.dependencies,
        ...pkg.devDependencies
      };
    } catch (e) {
      console.error('Failed to parse package.json:', e);
    }
  }

  const hasDep = name => dependencies[name] !== undefined;

  if (fileExists('angular.json') || hasDep('@angular/core')) return 'angular';
  if (fileExists('svelte.config.js') || hasDep('svelte')) return 'svelte';
  if (fileExists('next.config.js') || hasDep('next')) return 'next.js';
  if (fileExists('nuxt.config.js') || hasDep('nuxt')) return 'nuxt.js';
  if (fileExists('gatsby-config.js') || hasDep('gatsby')) return 'gatsby';
  if (fileExists('remix.config.js') || hasDep('@remix-run/react')) return 'remix';
  if (fileExists('astro.config.mjs') || hasDep('astro')) return 'astro';
  if (hasDep('vue')) return 'vue';
  if (hasDep('react')) return 'react';

  return null;
}
