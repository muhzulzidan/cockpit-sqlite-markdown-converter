# Cockpit to Markdown

Briefly describe your project. For example, this could be a set of scripts to migrate data from a Cockpit CMS SQLite database to a more portable format (CSV, JSON) and then generate Markdown files for use in a static site generator or another CMS.

## Description

Provide a more detailed explanation of your project. Include the motivation behind it, the specific problems it solves, and the benefits it offers.

## Getting Started

### Dependencies

List any required libraries, tools, or frameworks that your project depends on.

- Node.js
- SQLite3
- csv-parse
- Turndown
- slugify
- contentful-management (if using Contentful)
- Any other dependencies your project needs

### Installation

Provide step-by-step instructions on how to get a development environment running.

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary Node.js dependencies:
   ```
   npm install
   ```
4. Ensure you have SQLite3 installed on your system.

### Configuration

Explain how to configure the project (if necessary).

- Include instructions on setting up environment variables or any configuration files required for connecting to databases, external APIs (e.g., Contentful), etc.

## Usage

Provide detailed instructions on how to use your project, including the purpose of each script and how to run them.

### Convert SQLite Database to CSV

1. **Description**: Script to export data from a Cockpit SQLite database into CSV files.
2. **How to run**:
   ```
   node exportSqliteToCsv.js
   ```

### Convert CSV to JSON

1. **Description**: Script to convert CSV files into JSON format.
2. **How to run**:
   ```
   node convertCsvToJson.js
   ```

### Convert JSON to Markdown

1. **Description**: Script to read JSON files and generate Markdown files, applying transformations such as generating slugs, formatting images, and extracting metadata.
2. **How to run**:
   ```
   node convertJsonToMarkdown.js
   ```

### Import Assets to Contentful (Optional)

1. **Description**: Script to upload assets to Contentful using the Contentful Management API.
2. **How to run**:
   ```
   node importAssetsToContentful.js
   ```

### Move Images to Uploads Root

1. **Description**: Script to move image files to the root of the uploads directory.
2. **How to run**:
   ```
   node moveImagesToUploadsRoot.js
   ```

## Contributing

If you wish to contribute to this project, describe how interested developers can get involved. Provide contact details or a contribution process if applicable.

## License

Specify the license under which your project is released.

