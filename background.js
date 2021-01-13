chrome.runtime.onInstalled.addListener(resetSettings);

function resetSettings(){
        chrome.runtime.getPackageDirectoryEntry(root => { 
    
            const rootReader = root.createReader();
            rootReader.readEntries(result => {
    
                const targetFile = result.filter(file => file.name === 'defaultSettings.json')[0];
                targetFile.file(file => {
    
                    const fileReader = new FileReader();
                    fileReader.onload = e => {
                        const data = JSON.parse(e.target.result);
                        chrome.storage.sync.clear();
                        chrome.storage.sync.set(data);
                    };
                    fileReader.readAsText(file);
                });
            });
        });
    };