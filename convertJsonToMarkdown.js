import fs from 'fs';
import path from 'path';
import TurndownService from 'turndown';
import slugify from 'slugify'; // Ensure you have slugify installed, or use a similar utility

// Create an instance of the turndown service
const turndownService = new TurndownService();

// Function to read JSON file and return parsed data
function readJsonFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Function to format front matter
// Function to format front matter
// Function to format front matter
function formatFrontMatter(postDocument) {
    


    // Generate slug from the title, ignoring the existing slug field
    const slug = slugify(postDocument.title || 'untitled', { lower: true, strict: true });

    // Modify image path to be root-relative
    const image = postDocument.image ? `/${path.basename(postDocument.image.path)}` : '';

    // Simplify the image path to just the filename
    const featuredImage = postDocument.image ? `./image/${path.basename(postDocument.image.path)}` : '';
    // Extract author from content
    const authorMatch = postDocument.content.match(/author: (.+)$/m);
    const author = authorMatch ? authorMatch[1].trim() : '';
    // Include all relevant fields in the front matter
    // Extract language from content if not available in the main JSON
    let language = postDocument.language || ''; // Default to empty string
    const languageMatch = postDocument.content.match(/language: (.+)$/m);
    if (languageMatch) {
        language = languageMatch[1].trim();
    }

    const frontMatterFields = {
        title: postDocument.title || 'Untitled',
        slug,
        date: postDocument.date || '',
        'generate-card': postDocument['generate-card'] || false,
        language, // Include extracted language
        tags: postDocument.tags || [],
        author, // Include extracted author
        featuredImage
    };

    return `---\n${Object.entries(frontMatterFields).map(([key, value]) => {
        return Array.isArray(value) ? `${key}: [${value.join(', ')}]` : `${key}: "${value}"`;
    }).join('\n')}\n---\n\n`;
}


// Function to add specified text after each title
function addTextAfterTitle(markdownContent) {
    const lines = markdownContent.split('\n');
    let modifiedContent = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if the line starts with "### "
        if (line.startsWith('### ')) {
            modifiedContent += line + '\n\n'; // Add title and newline
            i++; // Move to the next line
            modifiedContent += '\n\n'; // Add your specified text
        } else {
            modifiedContent += line + '\n'; // Add the line as it is
        }
    }

    return modifiedContent;
}



// Function to identify the end of each title and paragraph
function identifyEndOfTitleAndParagraph(content) {
    const titleEndRegex = /###\s(.+?)\n/g;
    const paragraphEndRegex = /\n\s*\n/g;

    let matchTitle = titleEndRegex.exec(content);
    let matchParagraph = paragraphEndRegex.exec(content);

    while (matchTitle || matchParagraph) {
        const titleIndex = matchTitle ? matchTitle.index + matchTitle[0].length : content.length;
        const paragraphIndex = matchParagraph ? matchParagraph.index : content.length;

        const endIndex = Math.min(titleIndex, paragraphIndex);

        // Log the endIndex for each title or paragraph
        console.log(`End Index: ${endIndex}`);

        matchTitle = titleEndRegex.exec(content);
        matchParagraph = paragraphEndRegex.exec(content);
    }
}


// Function to extract front matter and content
function extractFrontMatterAndContent(postDocument) {
    const frontMatterRegex = /^---[\s\S]+?---/;
    const match = postDocument.content.match(frontMatterRegex);

    let frontMatter = '';
    let content = postDocument.content;

    if (match && match[0]) {
        frontMatter = match[0];
        content = content.replace(frontMatterRegex, '').trim();
    }

    return { frontMatter, content };
}

// Function to sanitize filename
function sanitizeFilename(filename) {
    return slugify(filename, { lower: true, strict: true });
}


// Function to convert a post to Markdown and save it
function savePostAsMarkdown(post, directory) {
    // Parse the 'document' field of the post
    const postDocument = JSON.parse(post.document);

    // Check if 'content' exists and is not undefined
    if (postDocument && postDocument.content) {
        // Extract and format front matter from postDocument
        const formattedFrontMatter = formatFrontMatter(postDocument);

        // Extract content without front matter
        const { frontMatter, content } = extractFrontMatterAndContent(postDocument);

        // Log extracted front matter and content
        console.log('Extracted Front Matter:', frontMatter);
        console.log('Extracted Content:', content);

        // Apply Turndown service to convert HTML to Markdown
        // let markdownContent = turndownService.turndown(content);
        let markdownContent = content;

        // Add specified text after each title
        // markdownContent = addTextAfterTitle(markdownContent);

        // Identify the end of each title and paragraph
        // identifyEndOfTitleAndParagraph(markdownContent);

        // Log final markdown content
        console.log('Final Markdown Content:', markdownContent);

        // Combine formatted front matter and content
        const markdown = `${formattedFrontMatter}${markdownContent}`;

        // Create a sanitized filename and write file
        const sanitizedTitle = sanitizeFilename(postDocument.title || 'untitled');
        const filename = `${sanitizedTitle}.md`;
        fs.writeFileSync(path.join(directory, filename), markdown);
    } else {
        console.warn(`Post with ID ${post.id} does not have valid content`);
    }
}







// Main function to process all posts
function processPosts() {
    try {
        const posts = readJsonFile('./post5e71e258e08b2.json');
        const directory = './blog-posts';

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        posts.forEach(post => {
            try {
                savePostAsMarkdown(post, directory);
                const postDocument = JSON.parse(post.document);
                console.log(`Processed post: ${postDocument.title}`);
            } catch (error) {
                console.error(`Error processing post: ${error.message}`);
            }
        });

    } catch (error) {
        console.error(`Failed to process posts: ${error.message}`);
    }
}


// Run the process
processPosts();
