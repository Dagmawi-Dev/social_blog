import React from 'react'
import {Link} from 'react-router-dom'
import PostAuthor from '../components/PostAuthor'
import Thumbnail from '../images/blog22.jpg'

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor/>
          <div className="post-detail__buttons">
            <Link to={`/post/werwer/edit`} className='btn sm primary'>Edit</Link>
            <Link to={`/post/werwer/delete`} className='btn sm danger'>Delete</Link>

          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thubmnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eveniet odio nam beatae repellendus! Ex rem illo adipisci voluptas 
          velit vero mollitia sint delectus minus deleniti maxime, neque possimus magnam distinctio cupiditate aut dignissimos nobis ipsam.
           Officiis cum a doloribus?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta consequuntur, optio accusantium cupiditate eius at sunt! Ea eligendi perferendis reprehenderit optio? Impedit, possimus? Adipisci quisquam ipsam consequuntur doloremque debitis cupiditate sint itaque veritatis dicta doloribus optio, aspernatur deleniti 
          molestiae repellat, necessitatibus, dolore reprehenderit quis quas est expedita eveniet voluptatem similique? Possimus at illo quo!
           Minima.
        </p>
        
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptates rerum quisquam ipsa minima modi eum 
          soluta accusantium explicabo nobis.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor praesentium illo quis saepe impedit vel at exercitationem
           ex porro, voluptatum cupiditate vitae, earum distinctio cum accusantium obcaecati et nam adipisci alias? Fugit tempora, 
           inventore voluptatibus fugiat incidunt quia minima libero asperiores ab dolore blanditiis sed a, magnam deserunt! Maiores
            modi fugiat labore expedita, dolore ducimus dolorem rerum similique vel blanditiis, vero quisquam quas, inventore 
             neque fuga quos. Veniam similique, tenetur animi eligendi saepe magnam hic cupiditate, provident earum at harum ea minus ma
             iores rem dignissimos vitae eaque enim. Maiores illum laborum nihil doloremque officia aut sit ipsam quod voluptatem. Ut, o
             bcaecati? Alias modi error provident libero qui voluptates amet animi voluptatum a labore, deleniti placeat itaque reiciend
            is. Possimus tempora, iste, incidunt labore magni iusto laudantium vel exercitationem esse sed magnam consequatur reiciendis
             assumenda eius consectetur placeat inventore est, quas eligendi quibusdam. Reiciendis minus recusandae itaque quasi nisi 
             consequuntur, magni corporis voluptas optio totam quo repellat, deserunt debitis, perspiciatis quod! Expedita tenetur 
             temporibus impedit culpa, quia nostrum nesciunt et soluta cumque, dicta doloribus explicabo illum id voluptates modi dolor 
             voluptas accusantium blanditiis nulla aut, cum officia deserunt iste repellendus. Nesciunt laudantium, quod libero mollitia 
             quaerat dolorem magni adipisci voluptates repudiandae?
        </p>
      </div>
    </section>
  )
}

export default PostDetail