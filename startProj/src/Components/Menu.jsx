export default function Menu({ content, children, Tag = "menu" }) {
  return (
    <>
      <Tag>{children}</Tag>
      {content}
    </>
  );
}
