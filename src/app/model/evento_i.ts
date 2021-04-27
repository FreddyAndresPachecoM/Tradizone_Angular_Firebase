export interface EventoI{
    uid?: string;
    event_date: string;
    event_date_create: string;
    event_description: string;
    event_location: string;
    event_title: string;
    event_url_image: string;
    event_state: boolean;

    /** Relaciones --------- */
    idUsuario: string;
}