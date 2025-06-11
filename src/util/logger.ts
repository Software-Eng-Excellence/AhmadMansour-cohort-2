import winston from 'winston';
import path from 'path';
import config from '../config';

const { logDir, isDev } = config;

const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

const devFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
        return `[${timestamp}] ${level}: ${message}${stack ? `\n${stack}` : ''}`;
    })
);

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, 'app-errors.log'),
            level: 'error',
            format: fileFormat
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'app-combined.log'),
            format: fileFormat
        })
    ]
    // 👇 Removed the exceptionHandlers block
});

if (isDev) {
    logger.add(
        new winston.transports.Console({
            format: devFormat
        })
    );
    logger.level = 'debug';
}

export default logger;
