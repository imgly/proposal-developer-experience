#!/usr/bin/env python3
"""
Fetch and parse CE.SDK guides from the sitemap.
Generates a YAML file with all get-started URLs.
"""

import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from typing import List, Tuple

def fetch_sitemap(url: str) -> str:
    """Fetch the sitemap XML content."""
    with urllib.request.urlopen(url) as response:
        return response.read().decode('utf-8')

def extract_get_started_urls(xml_content: str) -> List[str]:
    """Extract all URLs matching cesdk/*/get-started/* pattern."""
    root = ET.fromstring(xml_content)
    
    # Handle namespace in sitemap
    namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    
    urls = []
    for url_elem in root.findall('.//ns:url/ns:loc', namespace):
        url = url_elem.text
        if url and re.match(r'.*cesdk/[^/]+/get-started/.*', url) and 'overview-e18f40' not in url:
            urls.append(url)
    
    return sorted(set(urls))

def generate_name(url: str) -> str:
    """Generate a human-readable name from the URL."""
    parts = url.strip('/').split('/')
    
    # Extract platform
    platform = parts[4].upper()
    
    # Extract guide type from URL segments
    guide_parts = parts[6:]  # After get-started/
    guide_type = []
    
    for part in guide_parts:
        # Skip platform repetitions and IDs
        if part.lower() == platform.lower() or re.match(r'^[a-z0-9]+-[a-z0-9]+$', part):
            continue
        # Clean up the part
        clean_part = part.replace('-', ' ').title()
        guide_type.append(clean_part)
    
    # Join guide type parts
    guide_desc = ' '.join(guide_type).strip()
    
    # Platform name mappings
    platform_names = {
        'JS': 'JavaScript',
        'REACT-NATIVE': 'React Native',
        'MAC-CATALYST': 'Mac Catalyst',
        'MACOS': 'macOS',
        'IOS': 'iOS',
        'NEXTJS': 'Next.js',
        'SVELTEKIT': 'SvelteKit',
        'VUE': 'Vue',
        'NODE': 'Node.js'
    }
    
    # Special cases based on URL patterns
    if 'nextjs' in url:
        platform = 'Next.js'
    elif 'sveltekit' in url:
        platform = 'SvelteKit'
    elif 'nuxt' in url:
        platform = 'Nuxt'
    elif 'bun' in url:
        platform = 'Bun'
        if not guide_desc:
            guide_desc = 'New Project'
    elif 'deno' in url:
        platform = 'Deno'
        if not guide_desc:
            guide_desc = 'New Project'
    else:
        platform = platform_names.get(platform, platform.title())
    
    # Clean up common patterns
    replacements = {
        'Clone Github Project': 'Clone GitHub Project',
        'Clone Xcode Project': 'Clone Xcode Project',
        'Npm': 'NPM',
        'Aws Lambda': 'AWS Lambda',
        'Swiftui': 'SwiftUI',
        'Uikit': 'UIKit',
        'New Activity Based Ui Project': 'New Project (Activity-based UI)',
        'New Fragment Based Ui Project': 'New Project (Fragment-based UI)',
        'New Jetpack Compose Project': 'New Project (Jetpack Compose)',
        'Without Ui': 'Without UI',
        'Integrate As Module': 'New Project (NPM Module)',
        'Npm Global Variable': 'New Project (NPM Global Variable)',
        'Manual Module': 'Manual Setup (ES Module)',
        'Manual Global Variable': 'Manual Setup (Global Variable)',
        'Vanilla': '',
    }
    
    for old, new in replacements.items():
        guide_desc = guide_desc.replace(old, new)
    
    # Handle SwiftUI/UIKit in iOS
    if platform == 'iOS':
        if 'swiftui' in url:
            guide_desc = guide_desc.replace('Swiftui', '').strip()
            guide_desc = f"{guide_desc} (SwiftUI)" if guide_desc else "SwiftUI"
        elif 'uikit' in url:
            guide_desc = guide_desc.replace('Uikit', '').strip()
            guide_desc = f"{guide_desc} (UIKit)" if guide_desc else "UIKit"
    
    # Handle Expo in React Native
    if platform == 'React Native' and 'existing-project-b9012y' in url:
        guide_desc = 'Existing Project (Expo)'
    elif platform == 'React Native' and 'new-project-a5678y' in url:
        guide_desc = 'New Project (Expo)'
    
    # Default guide description if empty
    if not guide_desc:
        guide_desc = 'New Project'
    
    return f"{guide_desc} - {platform}".strip()

def group_urls_by_platform(urls: List[str]) -> List[Tuple[str, List[Tuple[str, str]]]]:
    """Group URLs by platform for better organization."""
    groups = {}
    
    for url in urls:
        parts = url.strip('/').split('/')
        platform = parts[4]
        
        # Special handling for nested platforms
        if platform == 'react' and 'nextjs' in url:
            platform = 'nextjs'
        elif platform == 'svelte' and 'sveltekit' in url:
            platform = 'sveltekit'
        elif platform == 'vue' and 'nuxt' in url:
            platform = 'nuxt'
        
        if platform not in groups:
            groups[platform] = []
        
        name = generate_name(url)
        groups[platform].append((url, name))
    
    # Sort platforms
    platform_order = [
        'android', 'angular', 'electron', 'flutter', 'ios', 'js',
        'node', 'react-native', 'react', 'nextjs', 'svelte', 
        'sveltekit', 'vue', 'nuxt', 'mac-catalyst', 'macos'
    ]
    
    sorted_groups = []
    for platform in platform_order:
        if platform in groups:
            sorted_groups.append((platform, groups[platform]))
    
    # Add any remaining platforms
    for platform in sorted(groups.keys()):
        if platform not in platform_order:
            sorted_groups.append((platform, groups[platform]))
    
    return sorted_groups

def generate_yaml(grouped_urls: List[Tuple[str, List[Tuple[str, str]]]]) -> str:
    """Generate YAML content from grouped URLs."""
    yaml_lines = [
        '# CE.SDK Get Started Guides',
        '# Generated from https://img.ly/docs/cesdk/sitemap-0.xml',
        ''
    ]
    
    platform_names = {
        'android': 'Android',
        'angular': 'Angular',
        'electron': 'Electron',
        'flutter': 'Flutter',
        'ios': 'iOS',
        'js': 'JavaScript',
        'node': 'Node.js',
        'react-native': 'React Native',
        'react': 'React',
        'nextjs': 'Next.js',
        'svelte': 'Svelte',
        'sveltekit': 'SvelteKit',
        'vue': 'Vue',
        'nuxt': 'Nuxt',
        'mac-catalyst': 'Mac Catalyst',
        'macos': 'macOS'
    }
    
    for platform, urls in grouped_urls:
        platform_name = platform_names.get(platform, platform.title())
        yaml_lines.append(f'# {platform_name}')
        
        for url, name in urls:
            yaml_lines.append(f'- url: {url}')
            yaml_lines.append(f'  name: "{name}"')
        
        yaml_lines.append('')  # Empty line between sections
    
    return '\n'.join(yaml_lines).rstrip() + '\n'

def main():
    """Main function to fetch sitemap and generate guides.yaml."""
    sitemap_url = 'https://img.ly/docs/cesdk/sitemap-0.xml'
    output_file = 'guides.yaml'
    
    print(f"Fetching sitemap from {sitemap_url}...")
    try:
        xml_content = fetch_sitemap(sitemap_url)
        print("Sitemap fetched successfully.")
        
        print("Extracting get-started URLs...")
        urls = extract_get_started_urls(xml_content)
        print(f"Found {len(urls)} get-started URLs.")
        
        print("Grouping URLs by platform...")
        grouped_urls = group_urls_by_platform(urls)
        
        print("Generating YAML content...")
        yaml_content = generate_yaml(grouped_urls)
        
        print(f"Writing to {output_file}...")
        with open(output_file, 'w') as f:
            f.write(yaml_content)
        
        print(f"Successfully generated {output_file}")
        
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()