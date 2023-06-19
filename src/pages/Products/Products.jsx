export const Product = ({name, description, price,stock,descuento,total,update})=>{ //PROPS -> parámetros que se envían al momento de llamar al componente (la función)
    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
            <td>{price}</td>
            <td>{descuento}%</td>
            <td>{total}</td>
            <td>{stock}</td>

    
        </>
    )
}