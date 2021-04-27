export interface HistoriaI{
    uid?: string;
    history_description: string;
    history_title: string;
    history_url_image:string;
    history_state: boolean;

    /** Relaciones: ------------------ */
    idUsuario: string;
}