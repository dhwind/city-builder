import BuildingsCardsList from './components/cards/buildings-cards-list';
import BuildingsContent from './components/content/buildings-content';

const Builder: React.FC = () => {
  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <BuildingsCardsList />
      <BuildingsContent />
    </div>
  );
};

export default Builder;
