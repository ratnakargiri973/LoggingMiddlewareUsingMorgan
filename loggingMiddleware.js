import fs from "fs";
import path from "path";
import morgan from 'morgan';

export function loggingMiddleware(req, res, next) {
    
    const accessLogStream = fs.createWriteStream('access.log', {flags: 'a'});

    morgan.token('client-ip', (req) => req.ip);

   
    const infoToWrite = ':client-ip - :method :url - :status - :response-time ms - :date[iso]';

    
    morgan(infoToWrite, { stream: accessLogStream })(req, res, next);
}
