export namespace TemplateStore {
    export interface State {
        loading: boolean
        list: Template[]
    }

    export interface Template {
        themeBanner: string
        themeTitle: string
        themeDescription: string
        activityId: string
        urlKey: string
    }
}
