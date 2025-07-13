import { defineEventHandler, getQuery, getRouterParam, createError, setHeader } from 'h3';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const backendBase = config.server.backHost;

    // Получаем path, например /server/api/media/path/to/image.jpg
    const path = getRouterParam(event, 'path');
    if (!path) {
        throw createError({ statusCode: 400, statusMessage: "Image path is required" });
    }

    // Проксируем оригинальный url
    const imageUrl = `${backendBase}/${path}`;
    const query = getQuery(event);
    // Собираем query если надо
    const search = new URLSearchParams(query as any).toString();
    const fullUrl = search ? `${imageUrl}?${search}` : imageUrl;

    // Запрашиваем изображение у бэка
    try {
        const response: any = await fetch(fullUrl);
        if (!response.ok) {
            throw createError({ statusCode: response.status, statusMessage: response.statusText });
        }

        // Прокидываем headers
        for (const [key, value] of response.headers.entries()) {
            setHeader(event, key, value);
        }

        // Возвращаем поток
        event.node.res.statusCode = response.status;
        await streamPipeline(response.body, event.node.res);

        // Хак для h3: ничего не возвращаем, т.к. поток уже ушёл
        return event.node.res;
    } catch (error: any) {
        console.error("[Proxy Error] /media:", error?.data || error?.message || error);
        throw createError({
            statusCode: error?.statusCode || 500,
            statusMessage: error?.statusMessage || 'Failed to proxy media file',
        });
    }
});
