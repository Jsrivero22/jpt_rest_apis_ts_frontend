export function formatCurrency(amount:number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(amount);
}

export function toBoolean(str: string): boolean {
    return str.toLocaleLowerCase() === 'true';
}