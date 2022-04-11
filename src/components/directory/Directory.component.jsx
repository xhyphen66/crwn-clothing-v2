import CategoryItem from "../category-item/CategoryItem.component";
import './Directory.style.scss'

const Directory = ({categories}) => {
    return (
        <div className='directory-container'>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category}/>
            ))}
        </div>
    )
}

export default Directory;