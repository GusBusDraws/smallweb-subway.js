import copy
import json
from pathlib import Path

import data_backup


class NewData():
    def __init__(self, target=None, save_data=True, use_backup_data=False):
        self.new_data = {}
        self.target = target
        if self.target is not None:
            self.target_line = target[:2]
            self.target_index = int(target[2:])
        else:
            self.target_line = None
            self.target_index = None

        self.get_ref_data(use_backup=use_backup_data)
        self.remake_nodes()
        self.new_data["lines"] = copy.deepcopy(self.data["lines"])
        self.remake_edges()


    def add_nonstation_node(self, x=100, y=100):
        if self.this_this_name_int == self.target_index:
            new_name = f"{self.this_line}{str(self.target_index).zfill(2)}"
            self.new_data["nodes"][new_name] = {}
            self.new_data["nodes"][new_name]["x"] = x
            self.new_data["nodes"][new_name]["y"] = y
            self.new_data["nodes"][new_name]["name"] = new_name
            self.new_data["nodes"][new_name]["line"] = self.this_line
            self.new_data["nodes"][new_name]["is_station"] = 0
            print(f"Added non-station node '{self.target}' at x, y = {x}, {y}")
        if self.this_this_name_int >= self.target_index:
            new_name = f"{self.this_line}{str(self.this_this_name_int + 1).zfill(2)}"
            self.new_data["nodes"][new_name] = self.this_node
            self.new_data["nodes"][new_name]["name"] = new_name
            print(f"Updated node '{self.this_name}' to '{new_name}'")


    def get_ref_data(self, use_backup=False):
        if not use_backup:
            with open("data.json", "r") as file:
                self.data = json.load(file)
        else:
            self.data = data_backup.load()
            print("Backup data loaded.")


    def print_json(self):
        # Print to JSON
        print(json.dumps(self.new_data, indent=2))


    def remake_nodes(self):
        self.new_data["nodes"] = {}
        self.name_0 = list(self.data["nodes"].keys())[0]
        self.node_0 = self.data["nodes"][self.name_0]
        self.new_data["nodes"][self.name_0] = self.node_0
        for i in range(1, len(self.data["nodes"])):
            self.this_name = list(self.data["nodes"].keys())[i]
            self.this_node = self.data["nodes"][self.this_name]
            self.this_line = self.this_node["line"]
            self.this_this_name_int = int(self.this_name[2:])
            if (
                self.this_line == self.target_line
                and self.this_this_name_int >= self.target_index
            ):
                self.add_nonstation_node()
            else:
                self.new_data["nodes"][self.this_name] = self.this_node
                print(f"Added node '{self.this_name}'")


    def remake_edges(self):
        self.new_data["edges"] = []
        for i in range(1, len(self.new_data["nodes"])):
            self.this_name = list(self.new_data["nodes"].keys())[i]
            self.this_node = self.new_data["nodes"][self.this_name]
            self.this_line = self.this_node["line"]
            self.prev_name = list(self.new_data["nodes"].keys())[i - 1]
            self.prev_node = self.new_data["nodes"][self.prev_name]
            self.prev_line = self.prev_node["line"]
            if self.prev_line == self.this_line:
                # Add an edge to connect this node to the previous node
                self.new_data["edges"].append(
                    {self.this_line: [self.prev_name, self.this_name]}
                )
            else:
                # Add a final edge to connects the final node to the first node
                # (making a loop)
                self.new_data["edges"].append(
                    {self.prev_line: [self.prev_name, f"{self.prev_line}00"]}
                )

        # Complete the final line's loop
        self.new_data["edges"].append(
            {self.this_line: [self.this_name, f"{self.this_line}00"]}
        )


    def shift(self, x=0, y=0):
        for i in range(len(self.data["nodes"])):
            self.this_name = list(self.data["nodes"].keys())[i]
            x0 = self.data["nodes"][self.this_name]["x"]
            self.data["nodes"][self.this_name]["x"] = x0 + x
            y0 = self.data["nodes"][self.this_name]["y"]
            self.data["nodes"][self.this_name]["y"] = y0 + y


    def save_json(self, save_path="data.json"):
        with open(save_path, "w") as file:
            json.dump(self.new_data, file, indent=2)


def main():
    data = NewData(
        # target="sf03",
        use_backup_data=True
    )
    data.shift(y=50)
    data.save_json()
    # data.print_json()



if __name__ == "__main__":
    main()
