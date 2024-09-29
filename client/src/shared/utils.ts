import { api } from "./api";
import { Actions, Project } from "./types";
import { ProjectSettings } from "./api/types";
import { store } from "./store/store";

export async function downloadJSON(json: Record<string, unknown>) {
    try {
        const jsonData = JSON.stringify(json, null, 2); 
    
        const downloadLink = document.createElement('a');
        downloadLink.href = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;
        downloadLink.download = 'project.json';
    
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } catch (error) {
        console.error('Ошибка при скачивании данных:', error);
    }
}  

export async function exportProjectScheme({ name, tree }: Project) {
    // Сервер еще должен записать это в журнал действий пользователя
    const { project } = await api.project.export({ name, tree })
    
    if (!project) {
        Aristarh.voice('[exporter]: Project cannot be exported, because server is down.');
        return;
    }
    
    downloadJSON(project);
}

function openFilePickerAndProcessJson<T>(processJson: (json: T) => void) {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = '.json'; 
  
    input.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    processJson(json);
                } catch (error) {
                    // TODO: нужно здесь попап по хорошему показать
                    console.error('Ошибка при чтении JSON:', error);
                }
            };

            reader.readAsText(file);
        }
    });
  
    input.click();
}

export async function importProjectSchema(project: ProjectSettings) { 
    // Сервер валидирует вызов и записывает в журнал действий
    const response = await api.project.import(project);

    if (!response.isValid) {
        alert(response.reason)
    }

    store.dispatch({
        type: Actions.SET_PROJECT_GLOBALLY,
        payload: project,
    });
}

export function startImportScenario() {
    openFilePickerAndProcessJson<ProjectSettings>(importProjectSchema);
}