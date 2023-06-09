export const Product = ({name, description, price,stock})=>{
    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
            <td>{price}</td>
            <td>{stock}</td>
        </>
    )
}