from typing import Any, Generator, Iterable, Mapping, MutableMapping, Sized

class URIDict(MutableMapping[Any, Any]):
    def normalize(self, uri: str) -> str: ...
    store: dict[Any, Any]
    def __init__(self, *args, **kwargs) -> None: ...
    def __getitem__(self, uri): ...
    def __setitem__(self, uri, value) -> None: ...
    def __delitem__(self, uri) -> None: ...
    def __iter__(self): ...
    def __len__(self): ...

class Unset: ...

def load_schema(name): ...
def format_as_index(container: str, indices) -> str: ...
def find_additional_properties(instance: Iterable[Any], schema: Mapping[Any, Any]) -> Generator[Any, None, None]: ...
def extras_msg(extras: Iterable[Any] | Sized) -> str: ...
def ensure_list(thing) -> list[Any]: ...
def equal(one, two) -> bool: ...
def unbool(element, true=..., false=...): ...
def uniq(container) -> bool: ...
def find_evaluated_item_indexes_by_schema(validator, instance, schema) -> list[Any]: ...
def find_evaluated_property_keys_by_schema(validator, instance, schema) -> list[Any]: ...
