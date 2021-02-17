import Button2 from './Button2'

export function Pagination(props) {
  const numberOfPage = Math.ceil(props.NumberOfItemsInDB / props.NumberToShow);
  const skip = [];
  for (let i = 0; i < numberOfPage; i++) {
    skip[i] = i * props.NumberToShow;
  }

  return (
    <ul className="pagination justify-content-center" >
      {skip.map((number, index) => {
        return (
          <li className="page-item" >
            <Button2
              class="page-link bg-dark text-white"
              handleClick={props.handleClick}
              key={index}
              parameter={number}
              value={index + 1}
            />
          </li>
        );
      })}
    </ul>
  );
}
