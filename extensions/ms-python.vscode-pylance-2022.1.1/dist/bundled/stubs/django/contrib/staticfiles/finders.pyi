import os
from typing import Any, Iterable, Iterator, List, Mapping, Optional, Tuple, Type, Union, overload

from django.core.checks.messages import CheckMessage
from django.core.files.storage import Storage
from typing_extensions import Literal

_PathType = Union[str, bytes, os.PathLike]
searched_locations: Any

class BaseFinder:
    def check(self, **kwargs: Any) -> List[CheckMessage]: ...
    @overload
    def find(self, path: _PathType, all: Literal[True]) -> List[_PathType]: ...
    @overload
    def find(self, path: _PathType, all: Literal[False] = ...) -> Optional[_PathType]: ...
    def list(self, ignore_patterns: Any) -> Iterable[Any]: ...

class FileSystemFinder(BaseFinder):
    locations: List[Tuple[str, _PathType]] = ...
    storages: Mapping[str, Any] = ...
    def __init__(self, app_names: None = ..., *args: Any, **kwargs: Any) -> None: ...
    def find_location(self, root: _PathType, path: _PathType, prefix: str = ...) -> Optional[_PathType]: ...

class AppDirectoriesFinder(BaseFinder):
    storage_class: Type[Storage] = ...
    source_dir: str = ...
    apps: List[str] = ...
    storages: Mapping[str, Storage] = ...
    def __init__(self, app_names: None = ..., *args: Any, **kwargs: Any) -> None: ...
    def find_in_app(self, app: str, path: _PathType) -> Optional[_PathType]: ...

class BaseStorageFinder(BaseFinder):
    storage: Storage = ...
    def __init__(self, storage: Optional[Storage] = ..., *args: Any, **kwargs: Any) -> None: ...

class DefaultStorageFinder(BaseStorageFinder): ...

@overload
def find(path: str, all: Literal[True]) -> List[_PathType]: ...
@overload
def find(path: str, all: Literal[False] = ...) -> Optional[_PathType]: ...
def get_finders() -> Iterator[BaseFinder]: ...
@overload
def get_finder(import_path: Literal["django.contrib.staticfiles.finders.FileSystemFinder"]) -> FileSystemFinder: ...
@overload
def get_finder(
    import_path: Literal["django.contrib.staticfiles.finders.AppDirectoriesFinder"],
) -> AppDirectoriesFinder: ...
@overload
def get_finder(import_path: str) -> BaseFinder: ...
