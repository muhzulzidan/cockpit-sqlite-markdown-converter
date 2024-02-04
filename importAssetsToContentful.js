import contentful from 'contentful-management';
import fetch from 'node-fetch';


async function importAssetsToContentful(spaceId, accessToken, assetsJson) {
    const client = contentful.createClient({
        accessToken: accessToken,
        apiHost: 'api.contentful.com' // Explicitly set the API host
    });
    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment('master');
    const uploadedAssets = [];

    for (const asset of assetsJson) {
        const fileUrl = asset.document.absolute_path; // URL of your asset
        const response = await fetch(fileUrl);
        const buffer = await response.buffer();

        const createdAsset = await environment.createAsset({
            fields: {
                title: {
                    'en-US': asset.document.title
                },
                file: {
                    'en-US': {
                        contentType: asset.document.mime,
                        fileName: asset.document.title,
                        file: buffer
                    }
                }
            }
        });

        const processedAsset = await createdAsset.processForAllLocales();
        await processedAsset.publish();

        // Store the ID for later use
        uploadedAssets.push({
            originalId: asset.id,
            contentfulId: processedAsset.sys.id
        });
    }

    return uploadedAssets;
}

// Example usage
const spaceId = 'ppgejapvy9p3';
const accessToken = '9SUHyfAC4bNIOSRztlxX-p-j1Y58xZdHrZWMYi5ElBQ';
// const assetsJson = require('./assets.json');
import assetsJson from './assets.json' assert { type: 'json' };

importAssetsToContentful(spaceId, accessToken, assetsJson)
    .then((uploadedAssets) => {
        console.log('Uploaded assets:', uploadedAssets);
    })
    .catch(console.error);
