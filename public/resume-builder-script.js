
let resumeData = [];
let recordCount = 0;

const defaultConfig = {
    resume_title: "Cruise Ship Professional Resume",
    company_name: "Experienced Maritime Hospitality Professional", 
    footer_text: "Ready to sail the seven seas",
    background_color: "#f0f8ff",
    surface_color: "#ffffff",
    text_color: "#1e3a8a",
    primary_action_color: "#0891b2",
    secondary_action_color: "#1e40af",
    font_family: "Segoe UI",
    font_size: 16
};

const dataHandler = {
    onDataChanged(data) {
        resumeData = data;
        recordCount = data.length;
        
        // Update UI with saved data
        data.forEach(record => {
            const element = document.querySelector(`[data-field="${record.field}"]`);
            if (element) {
                element.textContent = record.value;
            }
        });
    }
};

async function saveField(field, value) {
    if (recordCount >= 999) {
        showToast('Maximum limit of 999 fields reached. Please delete some content first.');
        return;
    }

    const existingRecord = resumeData.find(r => r.field === field);
    
    if (existingRecord) {
        existingRecord.value = value;
        const result = await window.dataSdk.update(existingRecord);
        if (!result.isOk) {
            showToast('Error saving changes');
        }
    } else {
        const result = await window.dataSdk.create({
            id: Date.now().toString(),
            section: getFieldSection(field),
            field: field,
            value: value,
            order: Date.now()
        });
        if (!result.isOk) {
            showToast('Error saving new field');
        }
    }
}

function getFieldSection(field) {
    if (field.includes('job')) return 'work';
    if (field.includes('edu')) return 'education';
    if (field.includes('language')) return 'languages';
    if (field.includes('skill')) return 'skills';
    return 'personal';
}

function addWorkEntry() {
    if (recordCount >= 995) {
        showToast('Cannot add more entries - approaching storage limit');
        return;
    }

    const container = document.getElementById('work-container');
    const entryCount = container.children.length + 1;
    const entryId = `job${entryCount}`;
    
    const entry = document.createElement('div');
    entry.className = 'work-entry';
    entry.innerHTML = `
        <div class="entry-header">
            <div>
                <div class="entry-title editable-field" contenteditable="true" data-field="${entryId}-title">Position Title</div>
                <div class="editable-field" contenteditable="true" data-field="${entryId}-ship">Ship Name</div>
            </div>
            <div class="entry-date editable-field" contenteditable="true" data-field="${entryId}-date">Year</div>
        </div>
        <div class="editable-field" contenteditable="true" data-field="${entryId}-desc">Job description and achievements...</div>
        <button class="delete-btn" onclick="deleteWorkEntry(this)">Delete</button>
    `;
    
    container.appendChild(entry);
    attachFieldListeners(entry);
}

function addEducationEntry() {
    if (recordCount >= 997) {
        showToast('Cannot add more entries - approaching storage limit');
        return;
    }

    const container = document.getElementById('education-container');
    const entryCount = container.children.length + 1;
    const entryId = `edu${entryCount + 10}`;
    
    const entry = document.createElement('div');
    entry.className = 'education-entry';
    entry.innerHTML = `
        <div class="entry-header">
            <div>
                <div class="entry-title editable-field" contenteditable="true" data-field="${entryId}-title">Degree/Certification</div>
                <div class="editable-field" contenteditable="true" data-field="${entryId}-school">Institution</div>
            </div>
            <div class="entry-date editable-field" contenteditable="true" data-field="${entryId}-date">Year</div>
        </div>
        <button class="delete-btn" onclick="deleteEducationEntry(this)">Delete</button>
    `;
    
    container.appendChild(entry);
    attachFieldListeners(entry);
}

function addSkill() {
    if (recordCount >= 999) {
        showToast('Maximum limit reached. Please delete some content first.');
        return;
    }

    const container = document.getElementById('skills-container');
    const skill = document.createElement('div');
    skill.className = 'skill-item';
    skill.innerHTML = `<span contenteditable="true">New Skill</span> <button class="delete-btn" onclick="deleteSkill(this)">×</button>`;
    container.appendChild(skill);
}

function addLanguage() {
    if (recordCount >= 999) {
        showToast('Maximum limit reached. Please delete some content first.');
        return;
    }

    const container = document.getElementById('languages-container');
    const langCount = container.children.length + 1;
    const language = document.createElement('div');
    language.className = 'editable-field';
    language.contentEditable = true;
    language.setAttribute('data-field', `language${langCount + 10}`);
    language.textContent = 'Language - Level';
    container.appendChild(language);
    attachFieldListeners(language);
}

function addReference() {
    if (recordCount >= 999) {
        showToast('Maximum limit reached. Please delete some content first.');
        return;
    }

    const container = document.getElementById('references-container');
    const refCount = container.children.length + 1;
    const reference = document.createElement('div');
    reference.className = 'editable-field';
    reference.contentEditable = true;
    reference.setAttribute('data-field', `ref${refCount}`);
    reference.textContent = 'Reference Name - Position - Contact';
    container.appendChild(reference);
    attachFieldListeners(reference);
}

async function deleteWorkEntry(btn) {
    const entry = btn.closest('.work-entry');
    const fields = entry.querySelectorAll('[data-field]');
    
    for (const field of fields) {
        const fieldName = field.getAttribute('data-field');
        const record = resumeData.find(r => r.field === fieldName);
        if (record) {
            await window.dataSdk.delete(record);
        }
    }
    
    entry.remove();
}

async function deleteEducationEntry(btn) {
    const entry = btn.closest('.education-entry');
    const fields = entry.querySelectorAll('[data-field]');
    
    for (const field of fields) {
        const fieldName = field.getAttribute('data-field');
        const record = resumeData.find(r => r.field === fieldName);
        if (record) {
            await window.dataSdk.delete(record);
        }
    }
    
    entry.remove();
}

function deleteSkill(btn) {
    btn.closest('.skill-item').remove();
}

function attachFieldListeners(container = document) {
    const fields = container.querySelectorAll('[data-field]');
    fields.forEach(field => {
        field.addEventListener('blur', (e) => {
            const fieldName = e.target.getAttribute('data-field');
            const value = e.target.textContent.trim();
            if (value) {
                saveField(fieldName, value);
            }
        });
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Element SDK implementation
async function onConfigChange(config) {
    const resumeTitle = document.getElementById('resume-title');
    const footerText = document.getElementById('footer-text');
    
    if (resumeTitle) {
        resumeTitle.textContent = config.resume_title || defaultConfig.resume_title;
    }
    if (footerText) {
        footerText.textContent = config.footer_text || defaultConfig.footer_text;
    }

    // Apply colors
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const surfaceColor = config.surface_color || defaultConfig.surface_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const primaryActionColor = config.primary_action_color || defaultConfig.primary_action_color;
    const secondaryActionColor = config.secondary_action_color || defaultConfig.secondary_action_color;

    document.body.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, #e6f3ff 100%)`;
    document.querySelector('.container').style.background = surfaceColor;
    document.querySelectorAll('.section-title').forEach(el => el.style.color = textColor);
    document.querySelectorAll('.name-field').forEach(el => el.style.color = textColor);
    document.querySelectorAll('.add-btn').forEach(el => el.style.background = primaryActionColor);
    document.querySelector('.print-btn').style.background = secondaryActionColor;

    // Apply font
    const customFont = config.font_family || defaultConfig.font_family;
    const baseFontStack = 'Tahoma, Geneva, Verdana, sans-serif';
    document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;

    // Apply font size
    const baseSize = config.font_size || defaultConfig.font_size;
    document.body.style.fontSize = `${baseSize}px`;
    document.querySelectorAll('.name-field').forEach(el => el.style.fontSize = `${baseSize * 2}px`);
    document.querySelectorAll('.section-title').forEach(el => el.style.fontSize = `${baseSize * 1.125}px`);
    document.querySelectorAll('.title-field').forEach(el => el.style.fontSize = `${baseSize * 1.125}px`);
}

function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    config.background_color = value;
                    window.elementSdk.setConfig({ background_color: value });
                }
            },
            {
                get: () => config.surface_color || defaultConfig.surface_color,
                set: (value) => {
                    config.surface_color = value;
                    window.elementSdk.setConfig({ surface_color: value });
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    config.text_color = value;
                    window.elementSdk.setConfig({ text_color: value });
                }
            },
            {
                get: () => config.primary_action_color || defaultConfig.primary_action_color,
                set: (value) => {
                    config.primary_action_color = value;
                    window.elementSdk.setConfig({ primary_action_color: value });
                }
            },
            {
                get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                set: (value) => {
                    config.secondary_action_color = value;
                    window.elementSdk.setConfig({ secondary_action_color: value });
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                config.font_family = value;
                window.elementSdk.setConfig({ font_family: value });
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                config.font_size = value;
                window.elementSdk.setConfig({ font_size: value });
            }
        }
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["resume_title", config.resume_title || defaultConfig.resume_title],
        ["company_name", config.company_name || defaultConfig.company_name],
        ["footer_text", config.footer_text || defaultConfig.footer_text]
    ]);
}

// Initialize SDKs
async function initializeApp() {
    try {
        // Initialize Data SDK
        const dataResult = await window.dataSdk.init(dataHandler);
        if (!dataResult.isOk) {
            console.error('Failed to initialize data SDK');
        }

        // Initialize Element SDK
        if (window.elementSdk) {
            await window.elementSdk.init({
                defaultConfig,
                onConfigChange,
                mapToCapabilities,
                mapToEditPanelValues
            });
        }

        // Attach field listeners
        attachFieldListeners();
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// Start the app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
