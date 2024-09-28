export const ImportHandler = (req: any, res: any) => {
    const data = req.body;
    
    if (!data.tree || !data.name) {
        return res.status(400).json({ 
            isValid: 'false',
            reason: 'Name or project settings are missing.'
         })
    }

    return res.status(200).json({ isValid: true });
}