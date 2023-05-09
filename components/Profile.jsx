import PromptCard from "./PromptCard";
export default function Profile({ name, desc, data, handleEdit, handleDelete }) {
  return (
    <section className="w-full">
      <article className="flex items-center gap-12">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{name} Profile</span>
          <p className="desc text-left">{desc}</p>
        </h1>
      </article>
      <div className="mt-16 prompt_layout">
        {data.map((post, index) => (
          <PromptCard key={post._id} index={index} post={post} handleEdit={() => handleEdit && handleEdit(post)} handleDelete={() => handleDelete && handleDelete(post)} />
        ))}
      </div>
    </section>
  );
}
