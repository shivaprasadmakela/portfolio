import { Link } from 'react-router-dom';

type Props = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

export default function VideoCard({ id, title, thumbnailUrl }: Props) {
  return (
    <Link to={`/youtube/${id}`}>
      <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
        <img src={thumbnailUrl} alt={title} className="w-full" />
        <h3 className="p-2 text-white text-sm">{title}</h3>
      </div>
    </Link>
  );
}
