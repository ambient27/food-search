import Sub from './Sub';

const SubList = (sub) => {
    return (
        <ul >
            <Sub
                key={sub.id}
                substitutes={sub.substitutes}
                message={sub.message}
            />

        </ul>
    );
};

export default SubList;
