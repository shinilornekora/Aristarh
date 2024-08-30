export const ExportHandler = (req: any, res: any) => {
    const data = req.body;
    
    if (!Object.values(data)) {
        return req.status(400).json({ message: 'No data was provided.' })
    }

    res.status(200).json({ project: req.body });
}