#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Extract the inner content and attributes from an SVG file
 */
function extractSvgContent(svgPath) {
  const content = fs.readFileSync(svgPath, 'utf8');
  
  // Extract SVG attributes
  const svgMatch = content.match(/<svg\s+([^>]+)>/);
  if (!svgMatch) return { attrs: null, content: null };
  
  const attrsStr = svgMatch[1];
  
  // Extract width, height, and viewBox
  const width = attrsStr.match(/width="([^"]+)"/)?.[1] || '24';
  const height = attrsStr.match(/height="([^"]+)"/)?.[1] || '24';
  const viewBox = attrsStr.match(/viewBox="([^"]+)"/)?.[1] || '0 0 24 24';
  
  // Extract inner content
  const innerMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const innerContent = innerMatch ? innerMatch[1].trim() : '';
  
  return {
    attrs: { width, height, viewBox },
    content: innerContent
  };
}

/**
 * Generate SVG sprite from a directory of SVG files
 */
function generateSpriteFromDirectory(rootDir, outputFile = null, idPrefix = '') {
  const symbols = [];
  
  // Recursively walk through directory
  function walkDir(dir, prefix = '') {
    const files = fs.readdirSync(dir).sort();
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recurse into subdirectory
        const newPrefix = prefix ? `${prefix}/${file}` : file;
        walkDir(fullPath, newPrefix);
      } else if (file.endsWith('.svg')) {
        // Process SVG file
        const iconName = file.replace('.svg', '');
        const iconPath = prefix ? `${prefix}/${iconName}` : iconName;
        
        // Apply the ID prefix if provided
        const fullId = idPrefix ? `${idPrefix}/${iconPath}` : iconPath;
        
        const { attrs, content } = extractSvgContent(fullPath);
        
        if (attrs && content) {
          // Create symbol element
          let symbol = `  <symbol width="${attrs.width}" height="${attrs.height}" viewBox="${attrs.viewBox}" fill="none" id="${fullId}">\n`;
          
          // Add inner content with proper indentation
          const lines = content.split('\n');
          lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed) {
              symbol += `    ${trimmed}\n`;
            }
          });
          
          symbol += '  </symbol>';
          symbols.push(symbol);
        }
      }
    });
  }
  
  walkDir(rootDir);
  
  // Create the final SVG sprite
  const sprite = `<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">\n${symbols.join('\n')}\n</svg>`;
  
  if (outputFile) {
    fs.writeFileSync(outputFile, sprite);
    console.log(`Generated sprite with ${symbols.length} icons: ${outputFile}`);
  }
  
  return sprite;
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  let inputDir = path.join(__dirname, 'individual-icons');
  let outputFile = path.join(__dirname, 'imgly-generated.svg');
  let idPrefix = '';
  
  // Simple argument parsing
  let i = 0;
  while (i < args.length) {
    if (args[i] === '--prefix' && i + 1 < args.length) {
      idPrefix = args[i + 1];
      i += 2;
    } else if (!args[i].startsWith('--')) {
      if (!inputDir || inputDir === path.join(__dirname, 'individual-icons')) {
        inputDir = args[i];
      } else {
        outputFile = args[i];
      }
      i++;
    } else {
      console.error(`Unknown option: ${args[i]}`);
      console.log('\nUsage: ./generate.js [options] [input-dir] [output-file]');
      console.log('Options:');
      console.log('  --prefix <prefix>  Prefix to prepend to all icon IDs');
      console.log('\nExamples:');
      console.log('  ./generate.js');
      console.log('  ./generate.js icons-folder output.svg');
      console.log('  ./generate.js --prefix @imgly icons-folder output.svg');
      process.exit(1);
    }
  }
  
  // Check if input directory exists
  if (!fs.existsSync(inputDir)) {
    console.error(`Error: Input directory does not exist: ${inputDir}`);
    process.exit(1);
  }
  
  // Generate the sprite
  const spriteContent = generateSpriteFromDirectory(inputDir, outputFile, idPrefix);
  
  // Show preview if no output file specified
  if (outputFile === path.join(__dirname, 'imgly-generated.svg') && args.length === 0) {
    console.log('\nSprite content preview (first 1000 chars):');
    console.log(spriteContent.substring(0, 1000) + (spriteContent.length > 1000 ? '...' : ''));
  }
}

module.exports = { generateSpriteFromDirectory, extractSvgContent };