
{ pkgs }: {
  deps = [
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.dotnet-sdk_8
    pkgs.sqlite
  ];
}
